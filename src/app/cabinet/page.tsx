import { Suspense } from "react";
import LotteryType from "./LotteryType";

export default async function Cabinet() {

return <>
        <Suspense fallback={<div>Loading lottery type</div>}>
          <LotteryType />
        </Suspense>
</>

}