package com.techmahindra.myapp;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

	private static final int REQUEST_CODE = 10;
	private String hostUrl ="";
	
	//private LoginAppInterface loginInterface;
	
	private WebView webView;
	 
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		webView = (WebView)findViewById(R.id.webView);
		
		WebSettings webSettings = webView.getSettings();
		webSettings.setJavaScriptEnabled(true);
		webView.setWebViewClient(new WebViewClient());
		
		//loginInterface = new LoginAppInterface(this);
		
		//webView.addJavascriptInterface(loginInterface, "Android");
		
		SharedPreferences sharedPref = getApplicationContext().getSharedPreferences(
				getString(R.string.SharedPreferences_Screen_Settings),	
				MODE_PRIVATE);
	    
		if(sharedPref != null)
		{		
			hostUrl = sharedPref.getString(getString(R.string.ServerPath), "");	    	
		}
		
		if(hostUrl != "")
		{		
			webView.loadUrl(hostUrl);	    	
		}
		else
		{	
			try{
				Intent intent = new Intent(MainActivity.this, Settings.class);
				startActivityForResult(intent, REQUEST_CODE);		    
			}
			catch(Exception ex){
			//webView.loadData(getString(R.string.error_shost_url_null), "text/html", null);
				webView.loadData("<html><body>" + ex.toString() + "</body></html>", "text/html", null);
			}
		}
	  
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			return true;
		}
		return super.onOptionsItemSelected(item);
	}
	
	
	
	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
	    if (requestCode == REQUEST_CODE && resultCode == RESULT_OK && data != null) {
	       
	        hostUrl = data.getStringExtra(getString(R.string.ServerPath));
	        if(hostUrl != "")
			{		
				webView.loadUrl(hostUrl);	    	
			}
	        else
	        {
	        	webView.loadData("<html><body>Url not set</body></html>", "text/html", null);
	        }
	    }
	}
	
	private class MyWebViewClient extends WebViewClient {
	    @Override
	    public boolean shouldOverrideUrlLoading(WebView view, String url) {
	        if (Uri.parse(url).getHost().equals(hostUrl)) {
	            // This is my web site, so do not override; let my WebView load the page
	            return false;
	        }
	        // Otherwise, the link is not for a page on my site, so launch another Activity that handles URLs
	        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
	        startActivity(intent);
	        return true;
	    }
	}
}
