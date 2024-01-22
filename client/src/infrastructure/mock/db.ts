import { Database } from "fakebase";
import { UserT } from "./entity/UserT";

const db = new Database("./data/");
export const User = db.table<UserT>("users");
