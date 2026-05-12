function mainRouteMessage(requestTime: string): string {
  let responseText = "hello world!<br>";
  responseText += `<small>Requested at: ${requestTime}</small>`;
  return responseText;
}

export { mainRouteMessage };
