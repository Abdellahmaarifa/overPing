import { Resolver,Query, Args} from '@nestjs/graphql';

import { GwMatchMakingService } from '../../services/gw.matchMaking.service';




@Resolver()
export class MatchMakingQueryResolver {
    constructor(
        private readonly matchMakingService: GwMatchMakingService
    ) {}

    @Query(() => String)
    async hello() : Promise<string>{
      return this.matchMakingService.getHello();
    }

}
