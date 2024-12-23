import {LayoutHeader} from "@/component/layout/Header.tsx";

const NewGroup = () => {
    return(
        <div className="newgroup">
            <LayoutHeader/>
            <div className="setup-org-form">
                <h2>Tell us about your organization</h2>
                <h3>Set up your organization</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="org-name">Organization name *</label>
                        <input type="text" id="org-name" name="org-name" required/>
                        <p>This will be the name of your account on GitHub. Your URL will be: https://github.com/</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-email">Contact email *</label>
                        <input type="email" id="contact-email" name="contact-email" required/>
                    </div>
                    <div className="form-group">
                        <fieldset>
                            <legend>This organization belongs to:</legend>
                            <label>
                                <input type="radio" name="org-type" value="personal" defaultChecked/>
                                My personal account
                                <br/>
                                <small>i.e., lazhenyi (Labay)</small>
                            </label>
                            <label>
                                <input type="radio" name="org-type" value="business"/>
                                A business or institution
                                <br/>
                                <small>For example: GitHub, Inc., Example Institute, American Red Cross</small>
                            </label>
                        </fieldset>
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="checkbox" name="terms" required/>
                            I hereby accept the <a href="#">Terms of Service</a>. For more information about GitHub's
                            privacy practices, see the <a href="#">GitHub Privacy Statement</a>.
                        </label>
                    </div>
                    <button className="newbutton" type="submit">Next</button>
                </form>
            </div>
        </div>
    )
}

export default NewGroup