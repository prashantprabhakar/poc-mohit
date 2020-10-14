import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik';

import { getProfile,updateProfile } from './../../store/actions/auth.action'

const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const validate = values => {
    const errors = {}
    if(!values.fName) errors.fName = 'Field is required'
    if(!values.lName) errors.lName = 'Field is required'
    if(!values.phone) errors.phone = 'Phone is required'
    if(!values.address1) errors.address1 = 'Field is required'
    if(!values.email) errors.email = 'Field is required'
    if(!values.password) errors.password = 'Field is required'
  
    if(values.email && !emailregex.test(values.email.toLowerCase())) errors.email = 'Email is invalid'
    if(values.phone && !(/^\d+$/.test(values.phone))) errors.phone = 'Phone is invalid'
  
    return errors
  }


const Profile = (props) => {

    const [initialValues, setInitivalValues] = useState()

    useEffect(() => {
        props.getProfile()
    }, [])

    if(!props.profile) return <> </>

    return (
        <div className="container">
            <Formik
                initialValues={props.profile || {}}
                validate={validate}
                onSubmit={values => props.handleSubmit(values)}
            >
                {
                ({
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                    //handleSubmit,
                    //isSubmitting,
                }) => (
                    <form className="white">
                    <h5 className="grye-text"> Update Profile </h5>
                    <div className="input-field">
                    <label htmlFor="fname"> First Name * </label>
                    <input type="text" id="fName" name='fName' value={values.fName} onChange={handleChange} />
                    <span class="helper-text red-txt" data-error="wrong" data-success="right">{errors.fName} </span>
                    </div>

                    <div className="input-field">
                    <label htmlFor="lName"> Last Name * </label>
                    <input type="text" id="lName" name='lName' value={values.lName} onChange={handleChange} />
                    <span class="helper-text red-txt" data-error="wrong" data-success="right">{errors.lName} </span>
                    </div>

                    <div className="input-field">
                    <label htmlFor="phone"> Phone * </label>
                    <input type="text" id="phone" name='phone' value={values.phone} disabled={true} />
                    <span class="helper-text red-txt" data-error="wrong" data-success="right">{errors.phone} </span>
                    </div>

                    <div className="input-field">
                    <label htmlFor="address1"> Address Line 1 * </label>
                    <input type="text" id="address1" name='address1' value={values.address1} onChange={handleChange} />
                    <span class="helper-text red-txt" data-error="wrong" data-success="right">{errors.address1} </span>
                    </div>

                    <div className="input-field">
                    <label htmlFor="address2"> Address Line 2 </label>
                    <input type="text" id="address2" name='address2' value={values.address2} onChange={handleChange} />
                    <span class="helper-text red-txt" data-error="wrong" data-success="right">{errors.address2} </span>
                    </div>

                    <div className="input-field">
                    <label htmlFor="aptNo"> Apt No (Optional) </label>
                    <input type="text" id="aptNo" name='aptNo' value={values.aptNo} onChange={handleChange} />
                    <span class="helper-text red-txt" data-error="wrong" data-success="right">{errors.aptNo} </span>
                    </div>

                    <div className="input-field">
                    <label htmlFor="city"> City </label>
                    <input type="text" id="city" name='city' value={values.city} onChange={handleChange} />
                    <span class="helper-text red-txt" data-error="wrong" data-success="right">{errors.city} </span>
                    </div>

                    <div className="input-field">
                    <label htmlFor="state"> State </label>
                    <input type="text" id="state" name='state' value={values.state} onChange={handleChange} />
                    <span class="helper-text red-txt" data-error="wrong" data-success="right">{errors.state} </span>
                    </div>

                    <div className="input-field">
                    <label htmlFor="zip"> Zip </label>
                    <input type="text" id="zip" name='zip' value={values.zip} onChange={handleChange} />
                    <span class="helper-text red-txt" data-error="wrong" data-success="right">{errors.zip} </span>
                    </div>

                    <div className="input-field">
                    <label htmlFor="email"> Email *</label>
                    <input type="email" id="email" name='email' value={values.email} disabled={true} />
                    <span class="helper-text red-txt" data-error="wrong" data-disabledsuccess="right">{errors.email} </span>
                    </div>
                    

                    <div className="input-field">
                    <p>
                        <label htmlFor="subscribed_to_mails">
                        <input
                            id="subscribed_to_mails" 
                            type="checkbox" 
                            checked={values.subscribed_to_mails}
                            name="subscribed_to_mails"
                            onChange={() => setFieldValue('subscribed_to_mails', !values.subscribed_to_mails)}
                            //onChange={() => setState({...state, subscribed_to_mails: !state.subscribed_to_mails})}
                            onChange={handleChange}
                        />
                        <span> I agree to recieve marketting emails </span>
                        </label>
                    </p>
                    </div>

                    <div className="input-field">
                    <p>
                        <label htmlFor="accepted_tnc">
                        <input id="accepted_tnc" type="checkbox" checked={values.accepted_tnc} name="accepted_tnc"
                        onChange={() => setFieldValue('accepted_tnc', !values.accepted_tnc)}
                        />
                        <span> I agree to all terms and conditions </span>
                        </label>
                    </p>
                    </div>




                    <div className="input-field">
                    <button
                        type="button"
                        className="btn pink lighten-1 z-depth-0"
                        onClick={() => props.updateProfile(values)}
                        disabled={Object.keys(errors).length}
                    > Submit </button>
                    </div>
                    </form>
                    
                )
                }
            </Formik>
        </div>
    )

}

const mapStateToProps = (state) => ({
    profile: state.auth.profile
})

const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch(getProfile()),
    updateProfile: (newUser) => dispatch(updateProfile(newUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)