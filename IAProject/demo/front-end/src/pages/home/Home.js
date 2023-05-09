import Carousel from 'react-bootstrap/Carousel';
import "../../CSS/Home.css";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';


// import Placeholder from 'react-bootstrap/Placeholder';

function Home() {
  return ( 
    <div>
    <Carousel variant="dark">
      <Carousel.Item>
        <div className="a-block"></div>
        <Carousel.Caption className="caption">
          <h1>Auction Management System</h1>
          <p>Next generation software for the management of physical auction houses</p>
        </Carousel.Caption>      
      </Carousel.Item>
    </Carousel>
   
   

    <div>
    <CardGroup>
    <Card>
        
        <Card.Body>
          <Card.Title>Elegant Software</Card.Title>
          <Card.Text>
          AMS is simple, user-focused and easy to set up. Cloud-based software means the latest features are at your fingertips and data backups are automatic.
          </Card.Text>
        </Card.Body>
       
      </Card>
      <Card>
        
        <Card.Body>
          <Card.Title>Designed for your business</Card.Title>
          <Card.Text>
          AMS was designed with the complexities of auction house management in mind. Delight your customers and empower staff while maximising profits.
          </Card.Text>
        </Card.Body>
        
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Reliable. Supported. Trustworthy.</Card.Title>
          <Card.Text>
          As a provider of auction house software since 1997, our continuing relationship with our founding customers is testament to our firm commitment to customer support.
          </Card.Text>
        </Card.Body>
        
      </Card>
    </CardGroup>  
</div>
        
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '12vh' }}>
  <h2>Finally, software that matches your business</h2>
</div>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
  <h5>Delight, inspire, empower</h5>
</div>
    
<div>
<CardGroup>
      <Card>
        <Card.Img variant="top" src="https://img.freepik.com/free-vector/shield_78370-582.jpg "style={{ width: '150px', height: '150px' , display: 'block', margin: 'auto'}} />
        <Card.Body>
          <Card.Title>Safe and secure</Card.Title>
          <Card.Text>
          Cloud-based data centres provide multiple layers of security, keeping your data ultra safe and secure.
          </Card.Text>
        </Card.Body>
      </Card>


      <Card>
        <Card.Img variant="top" src="https://previews.123rf.com/images/veronchick84/veronchick842006/veronchick84200601505/149172263-smart-devices-icon-phone-icon-tablet-laptop-icon-computer-screen-symbol-of-notebook-and-mobile.jpg" style={{ width: '150px', height: '150px', display: 'block', margin: 'auto' }} />
        <Card.Body>
          <Card.Title>Any Device, Anytime</Card.Title>
          <Card.Text>
          A web browser and internet connection is all you need. AMS is compatible with Windows, Mac or Linux PC’s and tablets.
          </Card.Text>
        </Card.Body>
      </Card>


      <Card>
        <Card.Img variant="top" src="https://static-00.iconduck.com/assets.00/backup-data-icon-512x509-5wi60k7b.png" style={{ width: '150px', height: '150px', display: 'block', margin: 'auto' }} />
        <Card.Body>
          <Card.Title>Auto-backups</Card.Title>
          <Card.Text>
          Backups and data-recovery are fully managed for you - one less thing to worry about.
          </Card.Text>
        </Card.Body>
      </Card>


      <Card>
  <Card.Img variant="top" src="https://cdn2.iconfinder.com/data/icons/service-options-2/512/maintenance_v2-512.png" style={{ width: '150px', height: '150px', display: 'block', margin: 'auto' }} />
  <Card.Body>
    <Card.Title>Hands-off maintenance</Card.Title>
    <Card.Text>
    Get free updates and new features automatically as we continually improve AMS based on your feedback.
    </Card.Text>
  </Card.Body>
</Card>
    </CardGroup>
</div>



    </div>
    



    
  );
}

export default Home;