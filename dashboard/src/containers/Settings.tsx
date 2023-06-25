import axios from 'axios';
import { Header } from '../components/header';

export function Settings() {
    const  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let formData = new FormData(event.currentTarget);
      const url = formData.get("url") as string;
      const period = formData.get("period") as string;
      const time = formData.get("time") as string;
      const phone = formData.get("phone") as string;
      const email = formData.get("email") as string;
      const token = formData.get("token") as string;
  
      try {
        const response = await axios.post('http://localhost:3000/api/v1/scenarios', { 
          url,
          period,
          acceptance: {
            time,
          },
          informChannels: {
            phone,
            email,
          }
        }, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  
    return (
      <div className="white-page">
        <Header />
        <h2>Create settings</h2>
        <form onSubmit={handleSubmit}>          
        <div className="column-box">
        <div className="row-box">
            Token (for testing purposes, copy it from login (sign-in) window): <input name="token" type="text" size={200} />
          </div>
          <div className="row-box">
            url: <input name="url" type="text" />
          </div>
          <div className="row-box">
            period: <input name="period" type="text" />
          </div>
          <div className="row-box">
            time: <input name="time" type="text" />
          </div>
          <div className="row-box">
            phone: <input name="phone" type="text" />
          </div>
          <div className="row-box">
            email: <input name="email" type="text" />
          </div>
          <div className="empty" />
          <div className="row-box">
            <button type="submit">Send</button>
          </div>
        </div>
        </form>
      </div>
    );
  }