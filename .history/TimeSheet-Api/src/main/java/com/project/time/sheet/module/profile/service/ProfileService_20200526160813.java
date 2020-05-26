package com.project.time.sheet.module.profile.service;

import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.User;
import com.project.time.sheet.entity.UserProfileMs;
import com.project.time.sheet.exception.DataNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.project.time.sheet.common.EnumCodeResponse;
import com.project.time.sheet.module.profile.models.ReqEditProfile;
import com.project.time.sheet.module.profile.models.ReqInquiryProfile;
import com.project.time.sheet.module.profile.models.ReqInsertProfile;
import com.project.time.sheet.repository.UserProfileMsRepository;
import com.project.time.sheet.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    UserProfileMsRepository userProfileMsRepository;
    @Autowired
    UserRepository userRepository;

    public ResponseModel<List<UserProfileMs>> getAllUserProfile() {
		ResponseModel<List<UserProfileMs>> res = new ResponseModel<List<UserProfileMs>>();
		try {
			List<UserProfileMs> userProfileList = new ArrayList<UserProfileMs>();
			userProfileList = userProfileMsRepository.findAll();
			res.setCode(EnumCodeResponse.SUCCESS.getCode());
			res.setMessage(EnumCodeResponse.SUCCESS.name());
			res.setData(userProfileList);
		}catch (Exception e) {
			res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
		}
		return res;
    }

    public ResponseModel<List<UserProfileMs>> inquiryUserProfile(ReqInquiryProfile req) {
       
		ResponseModel<List<UserProfileMs>> res = new ResponseModel<List<UserProfileMs>>();
		try {
            List<UserProfileMs> data = new ArrayList<UserProfileMs>();
            User user = userRepository.getOne(req.getUserCode());
            Optional<UserProfileMs> userProfile = userProfileMsRepository.findByUser(user);
            if (userProfile.isPresent()) {
                data.add(userProfile.get());
                res.setData(data);
                res.setCode(EnumCodeResponse.SUCCESS.getCode());
                res.setMessage(EnumCodeResponse.SUCCESS.name());

            } else {
                throw new DataNotFoundException("Data not found, Method : inquiryUserProfile");
            }
            
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

    public ResponseModel insertProfile(ReqInsertProfile req) throws DataNotFoundException {

        ResponseModel res = new ResponseModel();

        try {
            User user = userRepository.getOne(req.getUserCode());
            List<UserProfileMs> userProfileList = userProfileMsRepository.findAllUserCode(user);
            Optional<User> userCode = userRepository.findByUserCode(req.getUserCode());
            List<UserProfileMs> userFlist = userProfileMsRepository.findByFnameAndLname(fname,lname);
            UserProfileMs profile = new UserProfileMs();

            if(!(userCode.isPresent())){
                throw new DataNotFoundException("Data not found, Method : insertUserProfile");

            }
            else if(userProfileList.size() == 0){
                profile.setUser(user);
                profile.setFirstName(req.getFirstName());
                profile.setLastName(req.getLastName());
                profile.setBirthday(req.getBirthday());
                profile.setAge(req.getAge());
                profile.setAddress(req.getAddress());
                profile.setPosition(req.getPosition());
                profile.setSite(req.getSite());
                userProfileMsRepository.save(profile);

                res.setCode(EnumCodeResponse.SUCCESS.getCode());
                res.setMessage(EnumCodeResponse.SUCCESS.name());

            }
            else {
                res.setCode(EnumCodeResponse.DATA_DUPLICATE.getCode());
                res.setMessage(EnumCodeResponse.DATA_DUPLICATE.name());
            }

        }
        catch (DataNotFoundException e){
            res.setCode(e.getCode());
            res.setMessage(e.getMessage());
            
        }
         catch (Exception e) {
            res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
        }
        return res;
        
    }

    public ResponseModel editProfile(ReqEditProfile req) {

        ResponseModel res = new ResponseModel();

        try {
            User user = userRepository.getOne(req.getUserCode());
            Optional<UserProfileMs> newUserProfile = userProfileMsRepository.findByUser(user);

            if (newUserProfile.isPresent()) {
                newUserProfile.get().setBirthday(req.getBirthday());
                newUserProfile.get().setAge(req.getAge());
                newUserProfile.get().setAddress(req.getAddress());
                userProfileMsRepository.save(newUserProfile.get());

            }
            else {
                throw new DataNotFoundException("Data not found, Method : editUserProfile");
            }
            res.setCode(EnumCodeResponse.SUCCESS.getCode());
			res.setMessage(EnumCodeResponse.SUCCESS.name());

        }catch (DataNotFoundException e){
            res.setCode(e.getCode());
            res.setMessage(e.getMessage());
            
        }catch (Exception e){
            res.setCode(EnumCodeResponse.FAIL.getCode());
            res.setMessage(e.getMessage());
            
        }
        return res;

    }

    
    
}