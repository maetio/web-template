/* eslint-disable react/jsx-props-no-spreading */
import { IconBaseProps } from "react-icons/lib";
import {
	MdOutlineSportsSoccer,
	MdSportsBasketball,
	MdSportsTennis,
	MdSportsVolleyball,
} from "react-icons/md";
import { Competition } from "types/competition";

// define sport icons
export const PickleballIcon = ({ ...params }: IconBaseProps) => (
	<MdSportsTennis {...params} />
);
export const BasketballIcon = ({ ...params }: IconBaseProps) => (
	<MdSportsBasketball {...params} />
);
export const VolleyballIcon = ({ ...params }: IconBaseProps) => (
	<MdSportsVolleyball {...params} />
);
export const SoccerIcon = ({ ...params }: IconBaseProps) => (
	<MdOutlineSportsSoccer {...params} />
);
export const SportIcons: Record<
	Competition["sport"],
	({ ...params }: IconBaseProps) => JSX.Element
> = {
	pickleball: PickleballIcon,
	basketball: BasketballIcon,
	volleyball: VolleyballIcon,
	soccer: SoccerIcon,
};
