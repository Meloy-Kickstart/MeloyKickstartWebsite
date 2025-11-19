const DISCORD =
  import.meta.env.VITE_DISCORD_INVITE || "https://discord.gg/34MX3ETzxk";

export const Join = () => {

  return (
    <section id="join" className="section">
      <h2 className="section-title">Stay in the Loop.</h2>
      <p className="text-zinc-300/90 mt-4 max-w-2xl">
        Join the conversation and get updates in our
        {" "}
        <a
          href={DISCORD}
          target="_blank"
          rel="noreferrer"
          className="text-violet-neon hover:underline"
        >
          Discord
        </a>
        .
      </p>
      <div className="mt-6">
        <a
          href={DISCORD}
          target="_blank"
          rel="noreferrer"
          className="button-primary"
        >
          Join Discord
        </a>
      </div>
    </section>
  );
};
