import { http, HttpResponse, passthrough } from "msw";

export const handlers = [
  // This handler will be called first but since
  // it doesn't return anything from its resolver,
  // MSW will continue looking for a handler that does.
  http.get("/user", ({ request }) => {
    console.log("Just observing:", request.method, request.url);
  }),

  // This handler is called next (2nd), and it returns
  // a JSON response from its resolver. MSW will stop looking
  // for handlers and will consider this one to be relevant
  // to the intercepted request.
  http.get("/user", () => {
    return HttpResponse.json({ name: "John" });
  }),

  // Although this handler also matches the request,
  // it will never be called because the previous handler
  // returned a mocked response.
  http.get("/user", () => passthrough()),
];
