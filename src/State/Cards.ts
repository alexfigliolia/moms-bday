import { connect } from "@figliolia/react-galena";
import { CardModel } from "Models/CardModel";

export const Cards = new CardModel();

export const connectCards = connect(Cards);
