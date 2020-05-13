package com.project.time.sheet.module.profile.service;

import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.UserProfileMs;
import com.project.time.sheet.exception.DataNotFoundException;

import java.util.List;
import java.util.Optional;

import com.project.time.sheet.common.EnumCodeResponse;
import com.project.time.sheet.module.profile.models.ReqEditProfile;
import com.project.time.sheet.module.profile.models.ReqInsertProfile;
import com.project.time.sheet.repository.UserProfileMsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    UserProfileMsRepository userProfileMsRepository;

    public ResponseModel insertProfile(ReqInsertProfile req) {

        ResponseModel res = new ResponseModel();

        try {
            List<UserProfileMs> userProfileList = studentRepository.findByNameAndLastname(student.getName(),student.getLastname());
            UserProfileMs profile = new UserProfileMs();
            
            profile.setUserCode(req.getUserCode());
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

        } catch (Exception e) {
            res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
        }
        return res;
        
    }

    public ResponseModel editProfile(ReqEditProfile req) {

        ResponseModel res = new ResponseModel();

        try {
            Optional<UserProfileMs> newUserProfile = userProfileMsRepository.findById(req.getUserCode());

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