import React from "react";
import PersonalInfo from "@/_components/common/myAccount/ProfileSetting/PersonalInfo";
import PasswordChange from "@/_components/common/myAccount/ProfileSetting/PasswordChange";
import EmailPref from "@/_components/common/myAccount/ProfileSetting/EmailPref";

const ProfileSetting = ({ storeId }) => {
    return (
        <>
            <div className="row">
                <div className="col-md-8">
                    <div className='address-form-wrapper'>
                        <div className="profileSettingPage">
                            <PersonalInfo />
                            <PasswordChange storeId={storeId} />
                        </div>
                        <div className="profileSettingPage pt-0">
                            <EmailPref storeId={storeId} />
                        </div>
                    </div>

                </div>
                <div className="col-md-4">

                </div>
            </div>
        </>

    )
}

ProfileSetting.isProtectedPage = true;

export default ProfileSetting;
