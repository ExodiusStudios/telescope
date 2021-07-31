import { GraphQLResolvers } from "../../../http";
import { Team } from "../../../models/team";
import { parseTakeSize } from "../../../util/http";

export default {
	team: async (_, { id }) => {
		return Team.findOne(id);
	},
	teams: async (_, { skip, take}, ctx) => {
		return await Team.find({
			where: {
				
			},
			skip: skip,
			take: parseTakeSize(take, 50)
		});
	}
} as GraphQLResolvers;