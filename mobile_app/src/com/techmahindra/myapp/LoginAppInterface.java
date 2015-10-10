package com.techmahindra.myapp;

import android.content.Context;
import android.webkit.JavascriptInterface;

public class LoginAppInterface {
	private Context mContext;
	private String mUserProfile;
	
    /** Instantiate the interface and set the context */
	LoginAppInterface(Context c) {
        mContext = c;
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public void setUserProfile(String userProfile) {
    	mUserProfile = userProfile;
    }

    public String getUserProfile(String userProfile) {
    	return mUserProfile;
    }
}
