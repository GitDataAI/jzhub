import {HttpClient} from "@/server/Client";
import {HotTimeParma} from "@/server/types";


export class ExploreApi extends HttpClient {
    async HotRepo(parma: HotTimeParma) {
        return await this.patch<string>("/explore/repo", parma)
    }
}