import type { DiscordApiError } from "../types/DiscordApi.js";
import { HTTPError } from "got";

/**
 * Function that shows the errors in the
 * console for better debugging.
 *
 * When an error is thrown by the API,
 * we just return null, so no need to handle
 * it here.
 */
export default function showError (e: unknown) {
  if (e instanceof HTTPError) {
    const body: DiscordApiError = JSON.parse(e.response.body as string);
    console.error(`Discord sent an error, code: ${body.code}.`);

    if (e.response.statusCode === 401)
      console.error("=> Token is invalid or missing.");
  }
  else {
    console.error("Unknown error", e);
  }
}