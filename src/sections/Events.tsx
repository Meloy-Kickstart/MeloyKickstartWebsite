import { motion } from "framer-motion";
import { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Shapes } from "../components/Shapes";
import { Reveal, SplitLines } from "../components/motion";
import raw from "../data/luma-events.json";
import { eventTitle, formatEventDate, type LumaEvent } from "../lib/events";

const data = raw as { upcoming: LumaEvent[]; past: LumaEvent[] };

const LUMA_PROFILE = "https://luma.com/user/usr-GjilPA3HrL19yKV";
const EASE = [0.22, 1, 0.36, 1] as const;

/** The next event, full width. The whole block is the RSVP link. */
const FeaturedEvent = ({ e }: { e: LumaEvent }) => {
  const { weekday, day, month, time } = formatEventDate(e.startAt, e.timezone);
  return (
    <motion.a
      href={e.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group relative block overflow-hidden rounded-3xl bg-maroon text-cream shadow-lift transition-colors hover:bg-maroon-600"
    >
      {e.cover && (
        <img
          src={e.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-25 transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-12 lg:p-14">
        {/* Date */}
        <div className="display leading-none text-cream">
          <span className="block text-[5rem] sm:text-[6.5rem] lg:text-[8rem]">{day}</span>
          <span className="mt-1 block text-base tracking-wider sm:text-lg">
            {weekday}, {month}
          </span>
        </div>

        {/* Title + details */}
        <div className="min-w-0">
          <p className="eyebrow text-rose-200">Next event</p>
          <h3 className="display mt-3 text-display-md text-cream">{eventTitle(e.name)}</h3>
          <p className="mt-5 text-base font-medium text-cream/85 sm:text-lg">
            {time}
            {e.location ? ` at ${e.location}` : ""}
          </p>
        </div>

        {/* CTA */}
        <span className="btn bg-cream text-maroon transition-transform group-hover:translate-x-1 lg:self-center">
          RSVP on Luma
          <FaArrowRight className="text-xs" aria-hidden />
        </span>
      </div>
    </motion.a>
  );
};

const EventCard = ({ e, idx, past }: { e: LumaEvent; idx: number; past?: boolean }) => {
  const { day, month, year, time } = formatEventDate(e.startAt, e.timezone);
  return (
    <motion.a
      href={e.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (idx % 4) * 0.08, ease: EASE }}
      className={`card group flex flex-col overflow-hidden p-0 sm:p-0 ${
        past ? "" : "border-maroon bg-rose-50"
      }`}
    >
      {e.cover ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-rose-100">
          <img
            src={e.cover}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="display absolute left-3 top-3 rounded-xl bg-cream px-3 py-2 leading-none shadow-lift">
            <span className="block text-2xl">{day}</span>
            <span className="block text-[0.6rem] tracking-wider">{month}</span>
          </div>
        </div>
      ) : (
        <div
          className={`display flex items-baseline gap-2 px-5 pt-5 leading-none ${
            past ? "text-maroon/70 group-hover:text-maroon" : "text-maroon"
          } transition-colors`}
        >
          <span className="text-4xl">{day}</span>
          <span className="text-xs tracking-wider">
            {month} {past ? year : ""}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold leading-snug text-maroon sm:text-lg">
          {eventTitle(e.name)}
        </h3>
        <p className="mt-auto pt-3 text-xs uppercase tracking-wider text-ink/60">
          {time}
          {e.location ? ` at ${e.location}` : ""}
        </p>
      </div>
    </motion.a>
  );
};

export const Events = () => {
  const [next, ...more] = data.upcoming;
  const past = data.past.slice(0, 4);
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} id="events" className="section isolate">
      <Shapes
        target={ref}
        shapes={[
          { kind: "circle", className: "-left-32 -top-16 h-80 w-80 sm:h-[30rem] sm:w-[30rem]", drift: -100 },
          { kind: "cloud", className: "-right-24 bottom-16 h-28 w-64 sm:h-40 sm:w-96", drift: 50 },
          { kind: "donut", className: "-right-12 top-[6%] h-40 w-40 sm:-right-16 sm:h-56 sm:w-56", drift: -140, spin: -120 },
        ]}
      />
      <div className="wrap">
        <SplitLines
          lines={["Events every other Thursday"]}
          className="display text-display-lg"
        />
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Reveal as="p" delay={0.2} className="lede">
            Workshops, speakers, demo nights. RSVP on Luma.
          </Reveal>
          <Reveal delay={0.3} className="self-start md:self-auto">
            <a
              href={LUMA_PROFILE}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Follow on Luma
            </a>
          </Reveal>
        </div>

        {/* Next event */}
        <div className="mt-10 sm:mt-14">
          {next ? (
            <FeaturedEvent e={next} />
          ) : (
            <Reveal
              delay={0.1}
              className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-maroon p-7 text-cream sm:flex-row sm:items-center sm:p-10"
            >
              <div>
                <p className="eyebrow text-rose-200">Next event</p>
                <p className="display mt-3 text-display-md text-cream">Not posted yet</p>
                <p className="mt-4 text-cream/85">Follow us on Luma to hear first.</p>
              </div>
              <a
                href={LUMA_PROFILE}
                target="_blank"
                rel="noreferrer"
                className="btn shrink-0 bg-cream text-maroon hover:-translate-y-0.5"
              >
                Follow on Luma
              </a>
            </Reveal>
          )}
        </div>

        {/* More upcoming */}
        {more.length > 0 && (
          <>
            <Reveal as="p" className="eyebrow mt-12 sm:mt-16">
              Also coming up
            </Reveal>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {more.map((e, i) => (
                <EventCard key={e.id} e={e} idx={i} />
              ))}
            </div>
          </>
        )}

        {/* Past */}
        {past.length > 0 && (
          <>
            <Reveal as="p" className="eyebrow mt-12 sm:mt-16">
              Past events
            </Reveal>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {past.map((e, i) => (
                <EventCard key={e.id} e={e} idx={i} past />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
