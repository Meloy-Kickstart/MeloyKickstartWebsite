import { useEffect, useMemo, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "join", label: "Join" },
  { id: "chat", label: "Chat" },
  { id: "partner", label: "Career Fair" },
  { id: "events", label: "Events" },
];

export const Navbar = () => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  const links = useMemo(() => SECTIONS, []);

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
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mt-4 rounded-2xl glass backdrop-blur-md border border-white/10">
          <nav className="flex items-center justify-between px-4 py-3">
            <a href="#home" className="flex items-center gap-3">
              <img
                src="/Logo.png"
                alt="Meloy Kickstart logo"
                className="h-7 w-7 md:h-8 md:w-8 rounded-sm shadow-sm"
                loading="eager"
                decoding="async"
              />
              <span className="font-futuristic text-lg tracking-wide neon-text">
                Meloy Kickstart
              </span>
            </a>

            <button
              aria-label="Toggle Menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden button-neon px-3 py-2 rounded-lg border border-white/10"
            >
              <span className="sr-only">Menu</span>
              <div className="w-5 space-y-1.5">
                <div className="h-0.5 bg-white/80" />
                <div className="h-0.5 bg-white/80" />
                <div className="h-0.5 bg-white/80" />
              </div>
            </button>

            <ul className="hidden md:flex items-center gap-2">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      active === l.id
                        ? "text-violet-neon"
                        : "text-zinc-300/90 hover:text-white"
                    }`}
                    aria-current={active === l.id ? "page" : undefined}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#partner" className="button-primary text-sm">
                  Partner
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden border-t border-white/10 px-4 pb-4">
              <ul className="flex flex-col gap-2 pt-2">
                {links.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-2 rounded-lg ${
                        active === l.id
                          ? "text-violet-neon"
                          : "text-zinc-300/90 hover:text-white"
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#partner"
                    onClick={() => setOpen(false)}
                    className="button-primary inline-block"
                  >
                    Partner
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
