import type { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";

type Data = {
  error?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { city } = req.query;
  if (req.method === "GET") {
    const weatherResponse = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=19bf94858624d4346e3ce37140858733`
    ).then((response) => response.json());
    res.status(200).json(weatherResponse);
  } else {
    res.status(404).json({ error: "This is a GET request" });
  }
}
