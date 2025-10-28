// src/ui/calendar/shared.ts
import { format } from "date-fns";
// === Clases visuales centralizadas ===
export const CL = {
    blockedBg: "bg-red-200/45 ring-1 ring-red-300/70",
    tastingBg: "bg-purple-200/40 ring-1 ring-purple-300/50",
    eventConfirmedBg: "bg-emerald-100/60 ring-1 ring-emerald-200/70",
    eventReservedBg: "bg-yellow-100/60 ring-1 ring-yellow-200/70",
};
export function statusPill(status) {
    switch (status) {
        case "confirmed":
            return "bg-emerald-100 text-emerald-800 border border-emerald-200";
        case "reserved":
            return "bg-yellow-100 text-yellow-800 border border-yellow-200";
        case "cancelled":
            return "bg-gray-100 text-gray-500 border border-gray-200 line-through";
        default:
            return "bg-slate-100 text-slate-700 border border-slate-200";
    }
}
export function extractFacts(dto) {
    const events = dto?.events ?? [];
    const tastings = dto?.tastings ?? [];
    const tastingsCount = (dto?.tastings_count ?? tastings.length ?? 0);
    const isBlocked = !!dto?.is_blocked;
    const hasEvents = events.length > 0;
    const hasConfirmed = events.some((e) => e?.status === "confirmed");
    const hasReserved = events.some((e) => e?.status === "reserved");
    const hasTastings = tastingsCount > 0;
    return {
        events,
        tastingsCount,
        tastings,
        isBlocked,
        hasEvents,
        hasConfirmed,
        hasReserved,
        hasTastings,
    };
}
export function overlayClass(f) {
    if (f.isBlocked)
        return CL.blockedBg;
    if (f.hasEvents && f.hasConfirmed)
        return CL.eventConfirmedBg;
    if (f.hasEvents && f.hasReserved)
        return CL.eventReservedBg;
    if (!f.hasEvents && f.hasTastings)
        return CL.tastingBg;
    return null;
}
export const toISO = (d) => format(d, "yyyy-MM-dd");
export const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];
