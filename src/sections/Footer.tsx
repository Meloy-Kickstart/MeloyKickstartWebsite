export const Footer = () => {
  return (
    <footer className="section pt-10 pb-16">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="text-sm text-zinc-400">
          <div className="flex items-center gap-3">
            <img
              src="/Logo.png"
              alt="Meloy Kickstart logo"
              className="h-7 w-7 rounded-sm"
              loading="lazy"
              decoding="async"
            />
            <div className="font-futuristic text-zinc-200">Meloy Kickstart</div>
          </div>
          <div className="mt-1">
            Engineering Entrepreneurship @ Texas A&M University
          </div>
        </div>
        <div className="flex md:justify-end gap-4 text-sm">
          <a href="mailto:njohannessen@tamu.edu" className="hover:underline">
            njohannessen@tamu.edu
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            href={import.meta.env.VITE_DISCORD_INVITE}
          >
            Discord
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            href="https://www.linkedin.com/"
          >
            LinkedIn
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            href="https://www.instagram.com/"
          >
            Instagram
          </a>
        </div>
      </div>
      <div className="text-xs text-center text-zinc-600 mt-8">
        © {new Date().getFullYear()} Meloy Kickstart. All rights reserved.
      </div>
    </footer>
  );
};
