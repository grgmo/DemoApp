import Foundation

@objc(AppInfo)
class AppInfo: NSObject {
  var version : String {
    if let result = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String {
        return result
    } else {
        return ""
    }
  }
  
  @objc func constantsToExport() -> [String: Any]! {
     return ["appVersion": version]
   }
  
  @objc static func requiresMainQueueSetup() -> Bool {
      return true
  }
}
