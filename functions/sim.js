export async function onRequestPost(context) {
  const data = await context.request.json();
  await context.env.SIM_SPACES.put(data.name, JSON.stringify(data));
  return new Response("OK");
}

export async function onRequestGet(context) {
  const list = await context.env.SIM_SPACES.list();
  return new Response(JSON.stringify(list.keys), {
    headers: { "Content-Type": "application/json" }
  });
}
