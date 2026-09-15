import { motion } from "framer-motion";
import { Reveal, SplitLines } from "../components/motion";
import raw from "../data/luma-events.json";
import { eventTitle, formatEventDate, type LumaEvent } from "../lib/events";

const data = raw as { upcoming: LumaEvent[]; past: LumaEvent[] };

const LUMA_PROFILE = "https://luma.com/user/usr-GjilPA3HrL19yKV";
const EASE = [0.22, 1, 0.36, 1] as const;

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
          {e.location ? ` · ${e.location}` : ""}
        </p>
      </div>
    </motion.a>
  );
};

export const Events = () => {
  const upcoming = data.upcoming;
  const past = data.past.slice(0, 4);

  return (
    <section id="events" className="section">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal as="p" className="eyebrow">
              Events
            </Reveal>
            <SplitLines
              lines={["Every other", "week"]}
              className="display text-display-lg mt-4"
            />
            <Reveal as="p" delay={0.2} className="lede mt-6">
              Workshops, speakers, demo nights. RSVP on Luma.
            </Reveal>
          </div>
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

        {/* Upcoming */}
        <Reveal as="p" className="eyebrow mt-12 sm:mt-16">
          Upcoming
        </Reveal>
        {upcoming.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {upcoming.map((e, i) => (
              <EventCard key={e.id} e={e} idx={i} />
            ))}
          </div>
        ) : (
          <Reveal
            delay={0.1}
            className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border-2 border-dashed border-maroon/30 p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <p className="text-ink/75">
              Next event is not posted yet. Follow us on Luma to hear first.
            </p>
            <a
              href={LUMA_PROFILE}
              target="_blank"
              rel="noreferrer"
              className="btn-primary shrink-0"
            >
              Follow
            </a>
          </Reveal>
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
