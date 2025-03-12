import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api"; // Import the generated API

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("Missing CLERK_WEBHOOK_SECRET environment variable");
      return new Response("Internal Server Error", { status: 500 });
    }

    // Webhook header'larını kontrol et
    const svix_id =
      request.headers.get("svix-id") || request.headers.get("Svix-Id");
    const svix_signature =
      request.headers.get("svix-signature") ||
      request.headers.get("Svix-Signature");
    const svix_timestamp =
      request.headers.get("svix-timestamp") ||
      request.headers.get("Svix-Timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      console.error("Missing Svix headers", {
        svix_id,
        svix_signature,
        svix_timestamp,
      });
      return new Response("Missing headers", { status: 400 });
    }

    // Webhook doğrulaması öncesi ham gövdeyi al
    let body: string;
    try {
      body = await request.text();
    } catch (err) {
      console.error("Error reading request body:", err);
      return new Response("Invalid request body", { status: 400 });
    }

    // Webhook doğrulaması yap
    const wh = new Webhook(webhookSecret);
    let evt: any;
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamp": svix_timestamp,
      }) as any;
    } catch (err) {
      console.error("Webhook verification failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      return new Response(`Invalid signature: ${errorMessage}`, {
        status: 400,
      });
    }

    // Webhook event türünü al
    const eventType = evt.type;
    console.log(`Received webhook event: ${eventType}`);

    // Kullanıcı oluşturma işlemi
    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } =
        evt.data;

      if (!email_addresses || email_addresses.length === 0) {
        console.error("User creation event missing email addresses");
        return new Response("No email found", { status: 400 });
      }

      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.createUser, {
          email,
          fullname: name,
          image: image_url,
          clerkId: id,
          username: email.split("@")[0],
        });
        console.log(`User created successfully: ${email}`);
      } catch (err) {
        console.error("Error creating user:", err);
        return new Response("Error creating user", { status: 500 });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  }),
});

export default http;
