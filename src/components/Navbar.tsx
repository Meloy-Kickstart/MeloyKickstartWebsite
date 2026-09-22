import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "events", label: "Upcoming" },
];
const DISCORD = import.meta.env.VITE_DISCORD_INVITE || "https://discord.gg/jK5uQRXfSE";
const LUMA = "https://luma.com/user/usr-GjilPA3HrL19yKV";

export const Navbar = () => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      // Determine which section is currently in view
      let current = "home";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const threshold = Math.min(200, window.innerHeight * 0.25);
        if (rect.top <= threshold && rect.bottom >= threshold) {
          current = s.id;
          break;
        }
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the drawer if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const linkClass = (id: string) =>
    `text-xs font-medium uppercase tracking-wider transition-colors ${
      active === id ? "text-maroon" : "text-ink/60 hover:text-maroon"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b-2 border-maroon bg-cream/90 backdrop-blur">
      <nav className="wrap flex h-16 items-center justify-between sm:h-20">
        <a href="#home" className="flex items-center gap-3">
          <img
            src="/Logo.png"
            alt=""
            className="h-8 w-8 sm:h-9 sm:w-9"
            loading="eager"
            decoding="async"
          />
          <span className="display text-sm leading-none tracking-tight sm:text-base">
            Meloy
            <br />
            Kickstart
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {SECTIONS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={linkClass(l.id)}
                aria-current={active === l.id ? "page" : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={DISCORD} target="_blank" rel="noreferrer" className="btn-secondary px-4 py-2 text-xs">
              Join Discord
            </a>
          </li>
          <li>
            <a href={LUMA} target="_blank" rel="noreferrer" className="btn-primary px-4 py-2 text-xs">
              Join Luma
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-maroon text-maroon md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-0.5 w-full bg-current transition-transform ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-full bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-full bg-current transition-transform ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t-2 border-maroon bg-cream md:hidden">
          <ul className="wrap flex flex-col py-2">
            {SECTIONS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-maroon/10 py-4 text-sm font-semibold uppercase tracking-wider ${
                    active === l.id ? "text-maroon" : "text-ink/70"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="grid gap-3 py-4">
              <a href={DISCORD} target="_blank" rel="noreferrer" className="btn-secondary w-full">
                Join Discord
              </a>
              <a href={LUMA} target="_blank" rel="noreferrer" className="btn-primary w-full">
                Join Luma
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
