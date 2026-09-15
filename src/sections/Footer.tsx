const DISCORD =
  import.meta.env.VITE_DISCORD_INVITE || "https://discord.gg/jK5uQRXfSE";

const links = [
  { label: "Email", href: "mailto:meloykickstart@gmail.com", external: false },
  { label: "Discord", href: DISCORD, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/meloykickstart/", external: true },
  { label: "Instagram", href: "https://www.instagram.com/meloykickstart/", external: true },
];

export const Footer = () => {
  return (
    <footer className="border-t-3 border-maroon bg-maroon text-cream">
      <div className="wrap flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/Logo.png"
              alt=""
              className="h-8 w-8 rounded-sm bg-cream/90 p-0.5"
              loading="lazy"
              decoding="async"
            />
            <span className="display text-base leading-none text-cream">
              Meloy
              <br />
              Kickstart
            </span>
          </div>
          <p className="mt-4 text-sm text-cream/70">
            Engineering Entrepreneurship @ Texas A&amp;M University
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium uppercase tracking-wider">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
                className="text-cream/80 underline-offset-4 hover:text-cream hover:underline"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="wrap border-t border-cream/15 py-5 text-xs text-cream/50">
        &copy; {new Date().getFullYear()} Meloy Kickstart. All rights reserved.
      </div>
    </footer>
  );
};
