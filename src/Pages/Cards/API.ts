import Holiday from "Images/holiday.webp";
import JenSteve from "Images/jen-steve.webp";
import Outdoors from "Images/outdoors.webp";
import Balcony from "Images/balcony.webp";

export default [
  {
    name: "Jen & Steve",
    text: "Happy birthday dana!! Hope you have the best day!!",
    img: JenSteve,
  },
  {
    name: "Sienna & Joseph",
    text: "Happy birthday grandma!! We love you so much!!",
    img: Outdoors,
  },
  {
    name: "Alex",
    text: "Hi mom! I hope you have a wonderful birthday filled with lots of love and good times. I hope you have the best time with your friends in florida too!",
    url: "https://www.carta.healthcare",
    img: Holiday,
  },
  {
    name: "Mushy",
    text: "Wishing you a beautiful day filled with endless love, happiness, pickleball and pizza. I love you more than anything! HAPPY BIRTHDAY!",
    img: Balcony,
  },
] as const;
