import React from "react";
import { navigateTo } from "gatsby-link";
import Layout from '../../components/Layout'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigateTo(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Contact</h1>
              <form
                className="form form__contact"
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{" "}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>

                <div className="row">

                  <div className="col-12 col-sm-6">
                    <div className="field">
                      <label className="label" htmlFor={"first-name"} >First Name</label>
                      <div className="control">
                        <input placeholder="Your first name." className="input" type={"text"} name={"first-name"} onChange={this.handleChange} id={"first-name"} required={true} />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label" htmlFor={"last-name"} >Last name</label>
                      <div className="control">
                        <input placeholder="Your last name." className="input" type={"text"} name={"last-name"} onChange={this.handleChange} id={"last-name"} required={true} />
                      </div>
                    </div>                  
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="field">
                      <label className="label" htmlFor={"email"}>Email</label>
                      <div className="control">
                        <input placeholder="Your email address." className="input" type={"email"} name={"email"} onChange={this.handleChange} id={"email"} required={true} />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor={"phone"}>Phone</label>
                      <div className="control">
                        <input placeholder="Your phone number." className="input" type={"phone"} name={"phone"} onChange={this.handleChange} id={"phone"} required={true} />
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="field">
                      <label className="label" htmlFor={"message"}>Message</label>
                      <div className="control">
                        <textarea placeholder="Type your message." className="textarea" name={"message"} onChange={this.handleChange} id={"message"} required={true} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn__block justify-content-end">
                  <button className="btn btn__sm-round btn__submit" type="submit">Send</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}