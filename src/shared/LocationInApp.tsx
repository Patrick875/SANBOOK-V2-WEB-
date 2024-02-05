interface Props {
	location: string;
}

function LocationInApp({ location }: Props) {
	return <p className="my-2 text-sm font-bold ">{location}</p>;
}

export default LocationInApp;
