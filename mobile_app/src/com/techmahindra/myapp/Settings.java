package com.techmahindra.myapp;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class Settings extends Activity {

	private TextView lblMessage;
	private EditText serverUrl;
	
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    setContentView(R.layout.activity_settings);
	    
	    lblMessage = (TextView) findViewById(R.id.lblMessage);
	    serverUrl = (EditText) findViewById(R.id.txtServerPath);
	   
	    SharedPreferences sharedPref = getApplicationContext().getSharedPreferences(
	    		getString(R.string.SharedPreferences_Screen_Settings),	
				MODE_PRIVATE);
	    
	    if(sharedPref != null)
	    {	    	
	    	String serverPath = sharedPref.getString(getString(R.string.ServerPath), "");
	    		    	
	    	if(serverPath != null)
	    	{
	    		serverUrl.setText(serverPath);
	    	}
	    }
	    
	}
	
	
	public void btnSave_Click(View v){
		try
    	{					
		    String serverPath = serverUrl.getText().toString();
		   
		    		    
		    if(serverPath == null  || serverPath.equals(null) || serverPath == "")
		    {
		    	lblMessage.setText(getString(R.string.error_serverPath_cannot_null));
		    	return;
		    }
		    
			Intent output = new Intent();
						
			output.putExtra(getString(R.string.ServerPath), serverPath);
			
			SharedPreferences sharedPref = getApplicationContext().getSharedPreferences(
																		getString(R.string.SharedPreferences_Screen_Settings),	
																		MODE_PRIVATE);
			SharedPreferences.Editor editor = sharedPref.edit();
			editor.putString(getString(R.string.ServerPath), serverPath);
			editor.commit();
			
			setResult(RESULT_OK, output);
					
			finish();
    	}
    	catch(Exception ex){
    		lblMessage.setText(ex.toString());
    	}
	}

}
