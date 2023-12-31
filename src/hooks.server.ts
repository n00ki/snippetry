import { type Handle } from '@sveltejs/kit';
import { themes } from '$lib/utils/themes';

const handle_theme: Handle = async ({ event, resolve }) => {
  const theme = event.cookies.get('theme') ?? themes.default;
  event.locals.theme = theme;

  return await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%theme%', String(theme))
  });
};

export const handle: Handle = handle_theme;
