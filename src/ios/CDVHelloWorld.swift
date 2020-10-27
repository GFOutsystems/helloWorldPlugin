import UIKit

@objc(HelloWorld) class CDVHelloWorld: CDVPlugin {
    
    private lazy var window = UIWindow(frame: UIScreen.main.bounds)
    private lazy var vc = UIHelloWorld()
    
    override init() {
        super.init()
    }
    
    @objc(show:)
    func show(command: CDVInvokedUrlCommand) {
        initController()
//        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: "The plugin succeeded");
//        self.commandDelegate!.send(pluginResult, callbackId: command.callbackId);
    }
    
    private func initController() {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            self.window.rootViewController = self.vc
            self.window.makeKeyAndVisible()
        }
    }
}

private class UIHelloWorld: UIViewController {
    
    init() {
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        let helloLabel = UILabel()
        helloLabel.translatesAutoresizingMaskIntoConstraints = false
        helloLabel.text = "Hello World"
        view.addSubview(helloLabel)
        helloLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        helloLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }
}
