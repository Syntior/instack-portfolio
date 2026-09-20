import { HONEYPOT_FIELD } from "@/lib/validation";

/**
 * Hidden spam trap. It is moved off-screen and hidden from assistive tech and
 * the tab order, so people never touch it, while naive bots fill every input
 * they find. The server discards submissions where it has a value.
 */
export function Honeypot() {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
    >
      <label>
        Leave this field empty
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>
    </div>
  );
}
