import { Head } from "@inertiajs/react";
// <%= link_to "Sign in with Google", user_google_oauth2_omniauth_authorize_path, method: :post %>
export default function InertiaExample({
  name,
  login_url,
  token,
}: {
  name: string;
  login_url: string;
  token: string;
}) {
  return (
    <>
      <Head title="Inertia + Vite Ruby + React Example" />
      <h1>Hello {name}!</h1>
      <form action={login_url} method="post">
        <button type="submit">Sign in with Google</button>
        <input type="hidden" name="authenticity_token" value={token} />
      </form>
    </>
  );
}
