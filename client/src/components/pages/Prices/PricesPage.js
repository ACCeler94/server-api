import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Container } from 'reactstrap';
import { getConcerts, getRequest, loadConcertsRequest } from '../../../redux/concertsRedux';
import { convertWorkshopNames } from '../../../utils/convertWorkshopNames';


const Prices = () => {
  const dispatch = useDispatch();
  const concerts = useSelector(getConcerts)
  const request = useSelector(getRequest);


  useEffect(() => {
    dispatch(loadConcertsRequest())
  }, [dispatch]);

  if (request.success) {

    const firstConcertIndex = concerts.findIndex(concert => concert.day === 1);
    const dayOne = concerts[firstConcertIndex];

    const secondConcertIndex = concerts.findIndex(concert => concert.day === 2);
    const dayTwo = concerts[secondConcertIndex];

    const thirdConcertIndex = concerts.findIndex(concert => concert.day === 3);
    const dayThree = concerts[thirdConcertIndex];

    convertWorkshopNames(dayOne.workshops)





    return (
      <Container>
        <h1>Prices</h1>
        <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>

        <Alert color="info">
          Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
        </Alert>

        <h2>Day one</h2>
        <p>Price: {'$' + dayOne.price}</p>
        <p>Workshops: {convertWorkshopNames(dayOne.workshops)}</p>
        <h2>Day Two</h2>
        <p>Price: {'$' + dayTwo.price}</p>
        <p>Workshops: {convertWorkshopNames(dayTwo.workshops)}</p>
        <h2>Day three</h2>
        <p>Price: {dayThree.price}</p>
        <p>Workshops: {convertWorkshopNames(dayThree.workshops)}</p>
      </Container>
    )
  }
};

export default Prices;