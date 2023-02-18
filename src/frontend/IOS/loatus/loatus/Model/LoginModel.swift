//
//  LoginModel.swift
//  loatus
//
//  Created by 한서영 on 2023/02/14.
//

import Foundation

protocol LoginModelProtocol {
    func loginRetrieved(logins: login)
}

class LoginModel {
    
    var delegate: LoginModelProtocol?
    
    func getLogin() {
        let urlString = "
    }
}
