package com.demoapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import java.util.Map;
import java.util.HashMap;

public class AppInfo extends ReactContextBaseJavaModule {
    AppInfo(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "AppInfo";
    }

    @Override
    public Map<String, Object> getConstants() {
        String appVersion;

        try {
            appVersion = BuildConfig.VERSION_NAME;
        } catch (Exception e) {
            appVersion = "";
        }

        final Map<String, Object> constants = new HashMap<>();
        
        constants.put("appVersion", appVersion);
        return constants;
    }
}