#import "BundleLoader.h"

@implementation BundleLoader

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (void)loadBundle:(NSURL *)url
{
  [_bridge setValue:url forKey:@"bundleURL"];
  [_bridge reload];
}

RCT_EXPORT_METHOD(
                  runningMode:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *scheme = [[_bridge bundleURL] scheme];
  BOOL isRemote = [scheme isEqualToString:@"https"];
  resolve(isRemote ? @"REMOTE" : @"LOCAL");
}

RCT_EXPORT_METHOD(load:(NSURL*) url) {
  if ([NSThread isMainThread]) {
    [self loadBundle:url];
  } else {
    dispatch_sync(dispatch_get_main_queue(), ^{
        [self loadBundle:url];
    });
  }
  return;
}


@end
