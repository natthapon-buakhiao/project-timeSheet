package com.project.time.sheet.module.user.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.project.time.sheet.common.EnumCodeResponse;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.User;
import com.project.time.sheet.exception.DataNotFoundException;
import com.project.time.sheet.module.user.models.ReqInquiryUser;
import com.project.time.sheet.module.user.models.ReqInsertUser;
import com.project.time.sheet.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public ResponseModel<List<User>> getAllUser() {
		ResponseModel<List<User>> res = new ResponseModel<List<User>>();
		try {
			List<User> userList = new ArrayList<User>();
			userList = userRepository.findAll();
			res.setCode(EnumCodeResponse.SUCCESS.getCode());
			res.setMessage(EnumCodeResponse.SUCCESS.name());
			res.setData(userList);
		}catch (Exception e) {
			res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
		}
		return res;
    }

    public ResponseModel<List<User>> inquiryUser(ReqInquiryUser req) {
       
		ResponseModel<List<User>> res = new ResponseModel<List<User>>();
		try {
            List<User> data = new ArrayList<User>();
            Optional<User> user = userRepository.findByUserCode(req.getUserCode());
            if (user.isPresent()) {
                data.add(user.get());
                res.setData(data);

            } else {
                throw new DataNotFoundException("Data not found, Method : inquiryUserProfile");
            }

            res.setCode(EnumCodeResponse.SUCCESS.getCode());
            res.setMessage(EnumCodeResponse.SUCCESS.name());
        }catch (DataNotFoundException e){
            res.setCode(e.getCode());
            res.setMessage(e.getMessage());
            
        }
        catch (Exception e) {
			res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
		}
		return res;
    }

    public ResponseModel insertUser(ReqInsertUser req) {

        ResponseModel res = new ResponseModel();

        try {
            User newUser = new User();
            List<User> userList = userRepository.findAllUserCode(req.getUserCode());
            if(userList.size() == 0){
                newUser.setUserCode(req.getUserCode());
                newUser.ser
                userRepository.save(newUser);

                
            res.setCode(EnumCodeResponse.SUCCESS.getCode());
            res.setMessage(EnumCodeResponse.SUCCESS.name());

            } else {
                res.setCode(EnumCodeResponse.DATA_DUPLICATE.getCode());
                res.setMessage(EnumCodeResponse.DATA_DUPLICATE.name());
            }

        

        } catch (Exception e) {
            res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
        }
        return res;
        
    }
    
}