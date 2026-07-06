package com.kshitiz.quiz.service;

import com.kshitiz.quiz.dto.CategoryRequest;
import com.kshitiz.quiz.entity.Category;
import com.kshitiz.quiz.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Add Category
    public String addCategory(CategoryRequest request) {

        if (categoryRepository.existsByName(request.getName())) {
            return "Category Already Exists";
        }

        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

        categoryRepository.save(category);

        return "Category Added Successfully";
    }

    // Get All Categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Update Category
    public String updateCategory(Long id, CategoryRequest request) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category Not Found"));

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        categoryRepository.save(category);

        return "Category Updated Successfully";
    }

    // Delete Category
    public String deleteCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category Not Found"));

        categoryRepository.delete(category);

        return "Category Deleted Successfully";
    }
}