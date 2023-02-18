//
//  UserModel.swift
//  loatus
//
//  Created by 한서영 on 2023/02/02.
//

import Foundation
import Alamofire

struct LoginDataModel: Codable {
    var accessToken: String
    var grantType: String
    var refreshToken: String
    var username: String
    
}
struct UserModel: Codable {
    let code: Int
    let data: LoginDataModel?
    let message: String
}

class CurrentUser {
    static let shared = CurrentUser()
    
    private init() {}
    
    var accessToken: String
    var grantType: String
    var refreshToken: String
    var username: String
    
}
