export const Footer = () => {
  return (
    <footer className="section pt-10 pb-16">
      <div className="grid md:grid-cols-3 gap-6 items-center">
        <div className="text-sm text-zinc-400">
          <div className="font-futuristic text-zinc-200">Meloy Kickstart</div>
          <div className="mt-1">
            Engineering Entrepreneurship @ Texas A&M University
          </div>
        </div>
        <div className="text-center text-sm text-zinc-400">
          {/* Placeholder for TAMU logo — replace with official asset if permitted */}
          <span className="opacity-70">Texas A&amp;M</span>
        </div>
        <div className="flex md:justify-end gap-4 text-sm">
          <a href="mailto:meloykickstart@tamu.edu" className="hover:underline">
            meloykickstart@tamu.edu
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
