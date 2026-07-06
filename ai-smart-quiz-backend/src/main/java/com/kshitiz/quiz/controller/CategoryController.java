package com.kshitiz.quiz.controller;

import com.kshitiz.quiz.dto.CategoryRequest;
import com.kshitiz.quiz.entity.Category;
import com.kshitiz.quiz.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Add Category
    @PostMapping
    public String addCategory(@RequestBody CategoryRequest request) {
        return categoryService.addCategory(request);
    }

    // Get All Categories
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // Update Category
    @PutMapping("/{id}")
    public String updateCategory(@PathVariable Long id,
                                 @RequestBody CategoryRequest request) {
        return categoryService.updateCategory(id, request);
    }

    // Delete Category
    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }
}