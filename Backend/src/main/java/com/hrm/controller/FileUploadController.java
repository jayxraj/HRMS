package com.hrm.controller;

import com.hrm.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {
    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/resume")
    public String uploadResume(@RequestParam("file") MultipartFile file) {
        return fileStorageService.storeFile(file);
    }
}