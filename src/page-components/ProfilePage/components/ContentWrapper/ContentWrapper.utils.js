import CollectedIcon from './icons/Icon-Collected.svg'; 
import CreatedIcon from './icons/Icon-Created.svg'; 
import FavoritedIcon from './icons/Icon-Heart.svg'; 
import ActivityIcon from './icons/Icon-Activity.svg'; 
import OfferIcon from './icons/Icon-Offers.svg' ;

export const chooseSections = [
    {
        text: 'Collected',
        icon: <CollectedIcon />,
        nameForBE: 'collected',
        forRedux: 'ownedNfts'
    },
    {
        text: 'Created',
        icon: <CreatedIcon />,
        nameForBE: 'created',
        forRedux: 'createdNfts'
    },
    {
        text: 'Favorited',
        icon: <FavoritedIcon />,
        nameForBE: 'favorited',
        forRedux: 'favoritedNfts'
    },
    {
        text: 'Activity',
        icon: <ActivityIcon />,
        nameForBE: 'activity'
    },
    {
        text: 'Offers',
        icon: <OfferIcon />,
        nameForBE: 'offers'
    },
]
