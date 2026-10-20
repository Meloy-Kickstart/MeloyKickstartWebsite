import { FaDiscord, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaCalendarDays, FaEnvelope, FaGlobe } from "react-icons/fa6";
import type { IconType } from "react-icons";

const DISCORD = import.meta.env.VITE_DISCORD_INVITE || "https://discord.gg/jK5uQRXfSE";
const LUMA = "https://luma.com/user/usr-GjilPA3HrL19yKV";

// Linktree-style hub. The retractable banner's single QR code points here
// (meloykickstart.tech/links), so change links in this list, not on the banner.
const links: { label: string; href: string; icon: IconType; primary?: boolean }[] = [
  { label: "Join the Discord", href: DISCORD, icon: FaDiscord, primary: true },
  { label: "RSVP to events", href: LUMA, icon: FaCalendarDays, primary: true },
  { label: "Visit our website", href: "/", icon: FaGlobe },
  { label: "Instagram", href: "https://www.instagram.com/meloykickstart/", icon: FaInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/meloykickstart/", icon: FaLinkedin },
  { label: "Email us", href: "mailto:meloykickstart@gmail.com", icon: FaEnvelope },
];

export const Links = () => {
  return (
    <main className="hero-surface min-h-screen px-5 py-14 sm:py-20">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <img
          src="/Logo.png"
          alt=""
          className="h-20 w-20 rounded-2xl bg-white p-2 shadow-lift"
          decoding="async"
        />
        <h1 className="display mt-6 text-3xl leading-none">Meloy Kickstart</h1>
        <p className="eyebrow mt-3">Engineering entrepreneurship at Texas A&amp;M</p>

        <ul className="mt-10 grid w-full gap-3">
          {links.map(({ label, href, icon: Icon, primary }) => {
            const external = href.startsWith("http");
            return (
              <li key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className={`${primary ? "btn-primary" : "btn-secondary"} w-full py-4`}
                >
                  <Icon aria-hidden className="text-lg" />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-sm text-ink/60">Free. Any major. Just show up.</p>
      </div>
    </main>
  );
};
