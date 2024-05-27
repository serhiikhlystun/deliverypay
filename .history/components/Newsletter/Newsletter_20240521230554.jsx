import './Newsletter.sass';
import { createSubscribe } from '@/queries/createSubscribe';
import { useMutation } from 'react-query';
import setData from '@/helpers/setData';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Newsletter = () => {
  const [message, setMessage] = useState();

  const mutation = useMutation(email => {
    setData(createSubscribe, { email: email })
    .then((response) => {
      if(response.create_subscribers_email_item !== null){
        setMessage("You've successfuly subscribed.")
      } else {
        setMessage("Try another email.")
      }
    });
  });

  const handleSubmit = e => {
    e.preventDefault();

    mutation.mutate(e.target.email.value);
    console.log();

    e.target.email.value = ""
    toast.dark(message, {
      position:  "top-center",//toast.POSITION.TOP_RIGHT,
      autoClose: 500, // 3000 milliseconds = 3 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter__wrapp">
          <h2 className="newsletter__title">Subscribe Newsletter</h2>
          <p className="newsletter__subtitle">Subscribe to our email and get updates right in your inbox</p>
          <form onSubmit={handleSubmit} className="newsletter__input-wrapp">
            <button type="submit" className="newsletter__input-btn">
              <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2052_1826)">
                  <path
                    d="M7.60626 3.78948C7.25424 3.3609 7.05867 2.79699 7.07823 2.21053C7.07823 1.62406 7.27379 1.08271 7.64537 0.654137C7.99739 0.248122 8.48631 1.84544e-06 8.99479 1.88989e-06C9.50326 1.93434e-06 9.99218 0.20301 10.3638 0.609026L21.4329 13.3759C21.6089 13.5789 21.7458 13.8271 21.8435 14.0977C21.9413 14.3684 22 14.6617 22 14.9549C22 15.2481 21.9413 15.5414 21.8435 15.8346C21.7458 16.1053 21.6089 16.3534 21.4329 16.5564L10.3638 29.3233C10.1877 29.5263 9.97262 29.7068 9.73794 29.8195C9.4837 29.9323 9.22946 30 8.97523 30C8.72099 30 8.44719 29.9549 8.21251 29.8421C7.97783 29.7293 7.76271 29.5489 7.56714 29.3459C7.39113 29.1429 7.25423 28.8722 7.15645 28.6015C7.03911 28.3308 7 28.0376 7 27.7218C7 27.4286 7.05867 27.1353 7.15645 26.8647C7.25423 26.594 7.41069 26.3459 7.60626 26.1203L17.2868 14.9549L15.4485 12.8571L7.60626 3.78948Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2052_1826">
                    <rect width="29" height="30" fill="white" transform="translate(29 30) rotate(-180)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <input name="email" className="newsletter__input" required placeholder="Enter Your Email" type="email" />
          </form>
        </div>
      </div>
    </section>
      <ToastContainer />

  );
};

export default Newsletter;
